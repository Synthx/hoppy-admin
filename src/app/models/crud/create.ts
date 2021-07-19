export type Create<T> = Omit<T, 'id' | 'creationDate' | 'lastModifiedDate'>;
