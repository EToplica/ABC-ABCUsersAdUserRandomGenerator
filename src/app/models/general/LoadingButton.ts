export class LoadingButton {
    active: boolean;
    text: string;
    spinnerSize: number;
    raised: boolean;
    stroked: boolean;
    flat: boolean;
    fab: boolean;
    buttonColor: string;
    spinnerColor: string;
    fullWidth: boolean;
    disabled: boolean;
    mode: string;
    constructor(
        text: string,
        disabled: boolean = false,
        buttonColor: string = 'primary',
        spinnerColor: string = 'primary') {
        this.active = false;
        this.text = text;
        this.spinnerSize = 19;
        this.raised = true;
        this.stroked = false;
        this.flat = false;
        this.fab = false;
        this.buttonColor = buttonColor;
        this.spinnerColor = spinnerColor;
        this.fullWidth = false;
        this.disabled = disabled;
        this.mode = 'indeterminate';
    }
}
