import {
	mapActions as mapActionsVuex,
	mapGetters as mapGettersVuex,
	createNamespacedHelpers as createNamespacedHelpersVuex,
} from 'vuex';

type Store = any;

type RemoveFirstFromTuple<T extends any[]> =  T['length'] extends 0
	? [undefined]
	: (((...b: T) => void) extends (a: any, ...b: infer I) => void ? I : []);

export type Actions<T extends StoreOptions = Store> = {
	[K in keyof T['actions']]:
		(...params: RemoveFirstFromTuple<Parameters<T['actions'][K]>>) => ReturnType<T['actions'][K]>;
};
// tslint:disable-next-line: max-line-length
export function mapActions<T extends StoreOptions = Store, U extends keyof T['actions'] = keyof T['actions']>(
	actions: U[],
): {[K in U]: Actions<T>[K]} {
	return mapActionsVuex(actions as any) as any;
}

export type Getters<T extends StoreOptions = Store> = {
	[K in keyof T['getters']]: () => ReturnType<T['getters'][K]>;
};
export function mapGetters<T extends StoreOptions = Store, U extends keyof T['getters'] = keyof T['getters']>(
	getters: U[],
): {[K in U]: Getters<T>[K]} {
	return mapGettersVuex(getters as any) as any;
}

type Mod<
	T extends StoreOptions = Store,
	U extends keyof T['modules'] = keyof T['modules'],
	V extends T['modules'][U] = T['modules'][U]
> = V;

interface NamespacedHelpers<T extends StoreOptions = Store> {
	mapActions: (actions: [keyof Mod<T>['actions']]) => {[K in keyof Mod<T>['actions']]: Actions<Mod<T>>[K]};
	mapGetters: (getters: [keyof Mod<T>['getters']]) => {[K in keyof Mod<T>['getters']]: Getters<Mod<T>>[K]};
}

export function createNamespacedHelpers<T extends StoreOptions = Store>(
	...modules: [keyof T['modules']]
): NamespacedHelpers<T>;
export function createNamespacedHelpers<T extends StoreOptions = Store>(
	...modules: [keyof T['modules'], keyof Mod<T>['modules']]
): NamespacedHelpers<T>;
export function createNamespacedHelpers<T extends StoreOptions = Store>(
	...modules: (string | symbol | number)[]
): NamespacedHelpers<T> {
	return createNamespacedHelpersVuex(modules.join('/')) as any;
}

interface StoreOptions<S = any> {
	state?: S | (() => S);
	getters: {[k: string]: any};
	actions: {[k: string]: any};
	mutations: {[k: string]: any};
	modules: {[k: string]: StoreOptions};
	strict?: boolean;
}
