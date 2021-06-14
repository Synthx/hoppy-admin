import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { random } from '../../helpers/array-helper';

const COLORS = [
    'crimson',
    'bisque',
    'blueviolet',
    'burlywood',
    'chocolate',
    'coral',
    'cornflowerblue',
    'darkkhaki',
    'green',
    'indianred',
    'lightsalmon',
];

@Component({
    selector: 'app-user-avatar',
    templateUrl: './user-avatar.component.html',
    styleUrls: ['./user-avatar.component.scss'],
})
export class UserAvatarComponent implements OnInit {
    @Input()
    user!: User;

    color: string;

    constructor() {
        this.color = random(COLORS)!;
    }

    ngOnInit(): void {}
}
