import { TapBaseButton } from "../base-button";
import { PropertyValues } from "lit";
import { TapIcon } from "../icon";

export class IconButton extends TapBaseButton {
  protected updated(_changedProperties: PropertyValues) {
    super.updated(_changedProperties);
    const isSizeChanged = !!_changedProperties.get("size");
    this.checkSlotType();
    if (isSizeChanged) this.updateIconSize();
  }

  private checkSlotType = () => {
    const iconSlot = this.getIconSlot();
    if (!iconSlot && !this.loading)
      throw new Error('Slot of TapIconButton should be a "tap-icon"');
  };

  private updateIconSize = () => {
    const iconSlot = this.getIconSlot();
    iconSlot.width = this.getIconSize();
    iconSlot.height = this.getIconSize();
  };

  private getIconSlot = () =>
    this.shadowRoot
      ?.querySelector("slot")
      ?.assignedNodes()
      ?.find((el) => el.nodeName.toLowerCase().includes("tap-icon")) as TapIcon;

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
