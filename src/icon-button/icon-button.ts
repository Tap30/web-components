import { queryAssignedElements } from 'lit/decorators.js';
import { BaseButton } from '../base-button';
import { PropertyValues } from 'lit';
import { TapIcon } from '@tapsioss/icons';

export class IconButton extends BaseButton {
  @queryAssignedElements() private icon!: TapIcon[];

  protected updated(_changedProperties: PropertyValues) {
    super.updated(_changedProperties);
    const isSizeChanged = !!_changedProperties.get('size');
    if (isSizeChanged) this.updateIconSize();
  }

  private updateIconSize = () => {
    if (this.icon[0]) {
      this.icon[0].width = this.getIconSize();
      this.icon[0].height = this.getIconSize();
    }
  };

  private getIconSize = () => {
    switch (this.size) {
      case 'small':
        return 20;
      case 'medium':
      case 'large':
        return 24;
    }
  };
}
