import { getSelectors, RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { snakeToCamelCase } from '../../shared/helpers/string-helper';

const selectRouter = createFeatureSelector<RouterReducerState>('router');
const { selectRouteData, selectUrl } = getSelectors(selectRouter);

const data = createSelector(selectRouteData, data => data);
const url = createSelector(selectUrl, url => url);

const titleKey = createSelector(url, url => {
    return url
        ?.split('/')
        .filter(fragment => !!fragment)
        .map(fragment => snakeToCamelCase(fragment))
        .join('.');
});

export const routerSelector = {
    data,
    url,
    titleKey,
};
