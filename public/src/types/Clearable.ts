
/**
 * Динамическое наполнение и очистка
 * контейнера html
 */
export interface Clearable {
    fillContainer(obj: HTMLElement): void;
    clearContainer(): void;
}