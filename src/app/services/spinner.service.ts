import {ElementRef, Injectable} from '@angular/core';
import {ConnectionPositionPair, Overlay, OverlayConfig, OverlayRef, PositionStrategy} from '@angular/cdk/overlay';
import {ComponentPortal} from '@angular/cdk/portal';
import {SpinnerComponent} from '../components/spinner/spinner.component';

interface SpinnerConfig {
  hasBackdrop?: boolean;
  backdropClass?: string;
  panelClass?: string;
  global?: boolean;
  element?: ElementRef | HTMLElement;
}

const DEFAULT_CONFIG: SpinnerConfig = {
  hasBackdrop: true,
  backdropClass: 'cdk-overlay-dark-backdrop',
  panelClass: '',
  global: true,
  element: document.body
};

export class SpinnerOverlayRef {
  constructor(private overlayRef: OverlayRef) {

  }

  public hideSpinner(): void {
    if (this.overlayRef.hasAttached()) {
      this.overlayRef.dispose();
    }
  }
}

@Injectable()
export class SpinnerService {

  constructor(public overlay: Overlay) {
  }

  private createSpinner(config: SpinnerConfig): OverlayRef {
    const overlayConfig = this.getOverlayConfig(config);
    return this.overlay.create(overlayConfig);
  }

  private getOverlayConfig(config: SpinnerConfig): OverlayConfig {
    const positionStrategy = this.overlay.position()
      .global()
      .centerVertically()
      .centerHorizontally();

    return new OverlayConfig({
      hasBackdrop: config.hasBackdrop,
      backdropClass: config.backdropClass,
      panelClass: config.panelClass,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      disposeOnNavigation: true,
      positionStrategy: config.global ? positionStrategy : this.getPositionStrategy(config)
    });
  }

  private getPositionStrategy(config: SpinnerConfig): PositionStrategy {
    return this.overlay.position()
      .flexibleConnectedTo(config.element)
      .withPositions(this.getPositions())
      .withPush(false);
  }

  private getPositions(): ConnectionPositionPair[] {
    return [
      new ConnectionPositionPair(
        {originX: 'center', originY: 'bottom'},
        {overlayX: 'center', overlayY: 'top'}
      )
    ];
  }

  showSpinner(config: SpinnerConfig = {}) {
    const cfg = {...DEFAULT_CONFIG, ...config};
    const overlayRef = this.createSpinner(cfg);

    // Instantiate a wrapper overlay ref
    const spinnerOverlayRef = new SpinnerOverlayRef(overlayRef);

    // Create spinner component portal that we will attach to a PortalHost
    const spinnerPortal = new ComponentPortal(SpinnerComponent);

    // Attach ComponentPortal to PortalHost
    overlayRef.attach(spinnerPortal);

    return spinnerOverlayRef;
  }
}
