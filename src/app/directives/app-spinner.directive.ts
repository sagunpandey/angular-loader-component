import {
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  HostListener,
  Input, OnChanges, OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import {SpinnerComponent} from '../components/spinner/spinner.component';

@Directive({
  selector: '[appSpinner]'
})
export class AppSpinnerDirective implements OnInit, OnChanges, OnDestroy {

  private message: string;
  private createEmbeddedViewTimer: number;

  @Input('appSpinner')
  set showSpinner(spinning: boolean) {
    this.container.clear();

    if (spinning) {
      this.container.createEmbeddedView(this.template);
      this.spinnerComponent = this.container.createComponent(this.componentFactory);
      this.spinnerComponent.instance.message = this.message;
    } else {
      this.createEmbeddedViewTimer = setTimeout(() => {
        this.container.createEmbeddedView(this.template, 0);
      });
    }
  }

  @Input('appSpinnerMessage')
  set spinnerMessage(message: string) {
    this.message = message;
  }

  componentFactory: ComponentFactory<SpinnerComponent>;
  spinnerComponent: ComponentRef<SpinnerComponent>;

  constructor(private container: ViewContainerRef,
              private template: TemplateRef<any>,
              private componentFactoryResolver: ComponentFactoryResolver) {
    this.componentFactory = this.componentFactoryResolver.resolveComponentFactory(SpinnerComponent);
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes) {
    if (this.spinnerComponent && changes.spinnerMessage) {
      this.spinnerComponent.instance.message = changes.spinnerMessage.currentValue;
    }
  }

  ngOnDestroy() {
    clearTimeout(this.createEmbeddedViewTimer);
  }

  @HostListener('click', ['$event'])
  public onClick(event: any): void {
    event.stopPropagation();
  }

  @HostListener('mousedown', ['$event'])
  public onMouseDown(event: any): void {
    event.stopPropagation();
  }

  @HostListener('mouseup', ['$event'])
  public onMouseUp(event: any): void {
    event.stopPropagation();
  }
}
