import { Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { timer } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { QuotationService } from 'src/app/core/services/quotation.service';
import { ECurrency } from 'src/app/shared/enums/currency.enum';
import { ICurrencyOption } from 'src/app/shared/interfaces/currency.interface';
import { ITable } from 'src/app/shared/interfaces/table.interface';
import { mockArray } from 'src/app/shared/mocks/mock-unit-test';

@Component({
  selector: 'app-cash-flow-table',
  templateUrl: './cash-flow-table.component.html',
  styleUrls: ['./cash-flow-table.component.scss']
})
export class CashFlowTableComponent implements OnInit {

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _quotationService: QuotationService
  ) { }

  public table: ITable[] = [];

  @Input() set setTable(value: ITable[]) {
    if (value) {
      this.table = value;
      this.filterTable();
      
    }
  }

  @Output() $tableUpdated = new EventEmitter<ITable[]>()

  protected formCashFlow!: FormGroup;

  protected currentPage = 1;
  protected itemsPerPage = 5;
  protected paginatedData: any[] = [];
  protected currencyList: ICurrencyOption[] = [];
  protected filteredTable: ITable[] = [];
  protected checkedAll = false;
  protected currency = 'USD';
  protected formTable!: FormGroup;
  protected currentDate = new Date().toISOString().slice(0, 7);
  protected showModalDeleteOne = false;
  protected showModalDeleteAll = false;
  protected showEditModal  = false;
  protected showModalReload  = false;
  protected itemSelected!: number;

  get lastItemIndex() {
    return Math.min(this.currentPage * this.itemsPerPage, this.filteredTable.length);
  }
  get startIndex() {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  get endIndex() {
    return Math.min(this.startIndex + this.itemsPerPage, this.filteredTable.length);

  }

  get totalPages() {
    return Math.ceil(this.filteredTable.length / this.itemsPerPage);
  }


  ngOnInit(): void {
    this.createForm();
    this.getAllQuotations();
    this.formChanges();
    this.filterTable();
  }

  private createForm(): void {
    this.formTable = this._formBuilder.group({
      quotationCurrency: ['', [Validators.required]],
      date: [this.currentDate, [Validators.required]]
    });
    this.formCashFlow = this._formBuilder.group({
      transactionType: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      description: ['', [Validators.required]],
      date: ['', [Validators.required]],
      selected: [false],
      quotation: [0]
    })
  }

  private getAllQuotations(): void {
    timer(0, 30000).subscribe(() => {
      this._quotationService.getAllQuotation().pipe(
        map(response => Object.keys(response)
          .map(currency => {
            return {
              label: response[currency].codein == 'BRLT' ? 'Dólar Americano Turismo' : response[currency].name.split('/Real')[0],
              acronym: response[currency].code,
              value: response[currency].bid
            }
          })
        ),  
      )
        .subscribe({
          next: (response) => {
            this.currencyList = response;
          },
          error: (error) => {
            this.showModalReload = true;
          }
        })
    });
  }

  private formChanges(): void {
    this.formTable.controls['quotationCurrency'].valueChanges.subscribe(value => {
      value = JSON.parse(value);
      this.currency = value.acronym;
      this.table = this.table.map(item => {
        item.quotation = item.amount / value.currency;
        return item;
      });
    });

    this.formTable.controls['date'].valueChanges.subscribe(value => {
      this.filterTable();
    });
  }

  private filterTable(): void {
    this.currentPage = 1;
    this.filteredTable = this.table?.filter(item => {
      return this.compareMonths(item.date);
    });
  }

  private compareMonths(rowDate: string): boolean {
    const date1Obj = new Date(this.formTable.controls['date'].value);
    const date2Obj = new Date(rowDate);

    const filterYear = date1Obj.getFullYear();
    const filterMonth = date1Obj.getMonth() + 1;
    const rowYear = date2Obj.getFullYear();
    const rowMonth = date2Obj.getMonth();

    return filterYear === rowYear && filterMonth === rowMonth;
  }

  public updatePaginatedData(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex
      + this.itemsPerPage;
    this.paginatedData = this.filteredTable.slice(startIndex,
      endIndex);
  }

  public goToPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
    }
  }

  public handleCheckedAll(value: Event): void {
    const checkbox = value.target as HTMLInputElement;
    this.table.map((item) => {
      item.selected = checkbox.checked;
    })
  }

  public deleteItem(): void {
    this.table.splice(this.itemSelected, 1);
    this.$tableUpdated.emit(this.table); 
    this.filterTable();
    this.toggleModal();
  }
  
  public deleteAllItems(): void {
    this.table = this.table.filter(item => !item.selected);
    this.$tableUpdated.emit(this.table); 
    this.filterTable();
    this.toggleModalAll();
  }

  public quotationCurrencyValueFormatter(item: ICurrencyOption): string {
    return JSON.stringify({currency: item.value, acronym: item.acronym});
  }

  public counterSelectedRows(): number {
    return this.table.filter((item) => item.selected).length
  }

  public changeItemSelected(item: ITable): void {
    item.selected = !item.selected;
  }

  public toggleEditModal(): void {
    this.showEditModal = !this.showEditModal;
  }

  public toggleModal(): void {
    this.showModalDeleteOne = !this.showModalDeleteOne;
  }

  public toggleModalAll(): void {
    this.showModalDeleteAll = !this.showModalDeleteAll;
  }

  public reloadPage(): void {
    window.location.reload();
  }

  public selectItemExclude(index: number): void {
    this.itemSelected = index;
  }
  
  public selectItemEdit(item: ITable, index: number): void {
    this.itemSelected = index;
    this.formCashFlow.setValue(item );
  }

  public editItemModal(): void {
    const parsedCurrency = JSON.parse(this.formTable.controls['quotationCurrency'].value)
    this.formCashFlow.controls['quotation'].setValue(this.formCashFlow.controls['amount'].value / parsedCurrency.currency)
    this.table[this.itemSelected] = this.formCashFlow.value;
    this.$tableUpdated.emit(this.table); 
    this.filterTable();
    this.toggleEditModal();
  }
}
