import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { v4 as uuid } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { Provider } from '../providers/entities/provider.entity'; // Asegúrate de que el Provider esté bien importado

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>
  ) {}

  create(createProductDto: CreateProductDto) {
    const product = this.productRepository.save({
      ...createProductDto,
      provider: createProductDto.provider as DeepPartial<Provider>, // Convierte provider en un DeepPartial
    });
    return product;
  }

  findAll() {
    return this.productRepository.find();
  }

  findOne(id: string) {
    const product = this.productRepository.findOneBy({
      productId: id,
    });
    if (!product) throw new NotFoundException();
    return product;
  }

  findByProvider(id: string) {
    return this.productRepository.findBy({
      provider: {
        providerId: id,
      },
    });
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const productToUpdate = await this.productRepository.preload({
      productId: id,
      ...updateProductDto,
      provider: updateProductDto.provider as DeepPartial<Provider>,
    });
    if (!productToUpdate) throw new NotFoundException();
    await this.productRepository.save(productToUpdate);
    return productToUpdate;
  }

  remove(id: string) {
    this.findOne(id);
    this.productRepository.delete({
      productId: id,
    });
    return {
      message: `Objeto con id ${id} eliminado`,
    };
  }
}
