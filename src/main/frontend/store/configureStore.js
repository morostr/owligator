/**
 * Created by morten on 01/09/16.
 */
import { createStore, applyMiddleware} from 'redux'
import reducer, {createNewStateFromNodes} from './reducers'
import createSagaMiddleware from 'redux-saga'
import sagas from '../sagas'



export default function configureStore(nodes) {

    //console.log(nodes);
    let newState = createNewStateFromNodes(nodes);
    const sagaMiddleware = createSagaMiddleware();
    const store =  createStore(
        reducer,
        newState,
        applyMiddleware(sagaMiddleware));


    sagaMiddleware.run(sagas);

    return store;
}