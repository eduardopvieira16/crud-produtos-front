import { Component, OnInit } from '@angular/core';
import { ProdutoService, Produto } from '../../services/produto.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-produto-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './produto-list.component.html'
})
export class ProdutoListComponent implements OnInit {
  produtos: Produto[] = [];
  produtosFiltrados: Produto[] = [];
  filtro: string = '';

  constructor(private produtoService: ProdutoService, private router: Router) {}

  ngOnInit(): void {
    this.produtoService.getProdutos().subscribe((produtos) => {
      this.produtos = produtos;
      this.produtosFiltrados = produtos;
    });
  }

  criarProduto(): void {
    this.router.navigate(['/produtos/novo']);
  }

  excluirProduto(id: number): void {
    this.produtoService.excluirProduto(id).subscribe(() => {
      this.produtos = this.produtos.filter(produto => produto.id !== id);
      this.filtrarProdutos();
    });
  }

  editarProduto(produto: Produto): void {
    this.router.navigate(['/produtos/', produto.id]);
  }

  filtrarProdutos(): void {
    if (this.filtro) {
      this.produtosFiltrados = this.produtos.filter(produto =>
        produto.descricao.toLowerCase().includes(this.filtro.toLowerCase())
      );
    } else {
      this.produtosFiltrados = this.produtos;
    }
  }
}
