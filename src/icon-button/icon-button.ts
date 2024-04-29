import { queryAssignedElements } from "lit/decorators.js";
import { TapBaseButton } from "../base-button";
import { PropertyValues } from "lit";
import { TapIcon } from "../icon";

export class IconButton extends TapBaseButton {
  @queryAssignedElements() private icon!: TapIcon[];

  protected updated(_changedProperties: PropertyValues) {
    super.updated(_changedProperties);
    const isSizeChanged = !!_changedProperties.get("size");
    this.checkSlotType();
    if (isSizeChanged) this.updateIconSize();
  }

  private checkSlotType = () => {
    if (!this.icon[0] && !this.loading)
      throw new Error('Slot of TapIconButton should be a "tap-icon"');
  };

  private updateIconSize = () => {
    this.icon[0].width = this.getIconSize();
    this.icon[0].height = this.getIconSize();
  };

  private getIconSize = () => {
    switch (this.size) {
      case "small":
        return 20;
      case "medium":
      case "large":
        return 24;
    }
  };
}
