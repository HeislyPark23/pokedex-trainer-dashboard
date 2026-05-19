import {
  Injectable,
  signal,
} from '@angular/core';

export interface ToastMessage {
  id: number;

  text: string;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  readonly toasts =
    signal<ToastMessage[]>([]);

  /**
   * Shows toast message.
   */
  show(
    text: string
  ): void {
    const toast = {
      id: Date.now(),
      text,
    };

    this.toasts.update(
      (current) => [
        ...current,
        toast,
      ]
    );

    setTimeout(() => {
      this.remove(toast.id);
    }, 3000);
  }

  /**
   * Removes toast.
   */
  remove(id: number): void {
    this.toasts.update(
      (current) =>
        current.filter(
          (toast) =>
            toast.id !== id
        )
    );
  }
}