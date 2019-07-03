import {
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  HostListener,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import {SpinnerComponent} from '../components/spinner/spinner.component';

@Directive({
  selector: '[appSpinner]'
})
export class AppSpinnerDirective implements OnInit {

  private message: string;

  @Input('appSpinner')
  set showSpinner(spinning: boolean) {
    this.container.clear();

    if (spinning) {
      this.container.createEmbeddedView(this.template);
      this.spinnerComponent = this.container.createComponent(this.componentFactory);
      this.spinnerComponent.instance.message = this.message;
    } else {
      this.container.createEmbeddedView(this.template);
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
