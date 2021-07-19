import { Timestamp } from './timestamp';

export interface Auditable {
    creationDate: Timestamp;
    lastModifiedDate: Timestamp;
}
