import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { MenuModule } from 'primeng/menu';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';

import { Column } from '../../shared/interfaces/colummn';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    MenuModule,
    DividerModule,
    ButtonModule,
    PaginatorModule,
    CardModule
  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent {

  public requireAction = input<boolean>(false);


  public options = input.required<string>();

  public items = input<object[]>({} as object[]);

  public cols = input<Column[]>([] as Column[]);

}
