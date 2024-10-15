import { Component, OnInit } from '@angular/core';
import { ProdutoService, Produto } from '../../services/produto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-produto-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './produto-form.component.html'
})
export class ProdutoFormComponent implements OnInit {
  produto: Produto = { id: 0, descricao: '', preco: 0, dataValidade: new Date() };
  isEdit: boolean = false;

  constructor(
    private produtoService: ProdutoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEdit = true;
      this.produtoService.getProduto(+id).subscribe((produto) => {
        // Converter dataValidade de string para Date
        this.produto = {
          ...produto,
          dataValidade: new Date(produto.dataValidade) // Ajuste para converter string para Date
        };
      });
    }
  }

  salvarProduto(): void {
    if (this.isEdit) {
      this.produtoService.editarProduto(this.produto.id, this.produto).subscribe(() => {
        this.router.navigate(['/produtos']);
      });
    } else {
      this.produtoService.criarProduto(this.produto).subscribe(() => {
        this.router.navigate(['/produtos']);
      });
    }
  }
}
