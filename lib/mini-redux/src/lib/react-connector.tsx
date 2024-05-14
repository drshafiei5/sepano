import React, { Component, ComponentType, createElement } from 'react'
import { Entity } from './entity'
import { shallowEqual } from '../functions/shallowEqual';

interface IState<P> {
    stateSlice: Partial<P>;
}

export function connect<
    P,
    S1 extends object
>(
    Comp: ComponentType<P>,
    entites?: [Entity<S1>],
    stateSlicer?: (state1: S1) => Object
): ComponentType<P>;

export function connect<
    P,
    S1 extends object,
    S2 extends object
>(
    Comp: ComponentType<P>,
    entites?: [Entity<S1>, Entity<S2>],
    stateSlicer?: (state1: S1, state2: S2) => Object
): ComponentType<P>;

export function connect<
    P,
    S1 extends object,
    S2 extends object,
    S3 extends object,
>(
    Comp: ComponentType<P>,
    entites?: [Entity<S1>, Entity<S2>, Entity<S3>],
    stateSlicer?: (state1: S1, state2: S2, state3: S3) => Object
): ComponentType<P>;

export function connect<
    P,
    S1 extends object,
    S2 extends object,
    S3 extends object,
    S4 extends object,
>(
    Comp: ComponentType<P>,
    entites?: [Entity<S1>, Entity<S2>, Entity<S3>, Entity<S4>],
    stateSlicer?: (state1: S1, state2: S2, state3: S3, state4: S4) => Object
): ComponentType<P>;


export function connect<
    P,
    S1 extends object,
    S2 extends object,
    S3 extends object,
    S4 extends object,
    S5 extends object,
>(
    Comp: ComponentType<P>,
    entites?: [Entity<S1>, Entity<S2>, Entity<S3>, Entity<S4>, Entity<S5>],
    stateSlicer?: (state1: S1, state2: S2, state3: S3, state4: S4, state5: S5) => Object
): ComponentType<P>;

export function connect<
    P,
    S1 extends object,
    S2 extends object,
    S3 extends object,
    S4 extends object,
    S5 extends object,
    S6 extends object,
>(
    Comp: ComponentType<P>,
    entites?: [Entity<S1>, Entity<S2>, Entity<S3>, Entity<S4>, Entity<S5>, Entity<S6>],
    stateSlicer?: (state1: S1, state2: S2, state3: S3, state4: S4, state5: S5, state6: S6) => Object
): ComponentType<P>;

export function connect<
    P,
    S1 extends object,
    S2 extends object,
    S3 extends object,
    S4 extends object,
    S5 extends object,
    S6 extends object,
    S7 extends object,
>(
    Comp: ComponentType<P>,
    entites?: [Entity<S1>, Entity<S2>, Entity<S3>, Entity<S4>, Entity<S5>, Entity<S6>, Entity<S7>],
    stateSlicer?: (state1: S1, state2: S2, state3: S3, state4: S4, state5: S5, state6: S6, state7: S7) => Object
): ComponentType<P>;

export function connect<P extends object>(
    Comp: ComponentType<object>,
    entites: Entity<object>[] | undefined,
    stateSlicer: unknown): unknown {
    return class ReactConnector extends Component<P, IState<P>> {
        childElement: any;
        stateChanged: boolean;
        propsChanged: boolean;
        entites: Entity<object>[];
        unsubscribe!: () => void;

        constructor(props: P) {
            super(props);
            this.entites = [];
            this.propsChanged = false;
            this.stateChanged = false;
            this.state = { stateSlice: {} }
            this.onStoreChange = this.onStoreChange.bind(this);
            this.childElement = <Comp {...props} />
        }


        override componentDidMount() {
            this.propsChanged = true;
            this.entites = entites!;
            this.unsubscribe = this.subscribeToEntites(this.entites);
            this.onStoreChange();
        }

        override componentWillUnmount() {
            this.unsubscribe();
        }

        override componentWillReceiveProps(nextProps: P) {
            if (!shallowEqual(this.props, nextProps))
                this.propsChanged = true;
        }

        subscribeToEntites(entites: Entity<object>[]) {
            const unsubFns = entites.map(entity => entity.subscribe(this.onStoreChange));

            return function () {
                unsubFns.forEach(fn => fn());
            }
        }

        onStoreChange() {
            const states = this.entites.map(entity => entity.state);
            this.stateChanged = true;
            if (typeof stateSlicer === 'function') {
                const newSlice = stateSlicer(...states);
                this.setState({
                    stateSlice: {
                        ...this.state.stateSlice,
                        ...newSlice
                    }
                });
            }
        }

        override render() {
            if (this.propsChanged || this.stateChanged) {
                this.propsChanged = this.stateChanged = false;
                const childProps = { ...this.props, ...this.state.stateSlice };
                this.childElement = createElement(Comp, childProps);
            }

            return this.childElement;
        }
    }
}
