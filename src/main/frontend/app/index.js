import React from 'react'
//import ReactDOM from 'react-dom'
import '../style/style.css'

import { render } from 'react-dom'

import 'babel-polyfill'

import Node from '../modules/Node';
import {configureStore, createTree} from '../store'

import { Provider } from 'react-redux'

/*

ReactDOM.render(
	<h1 className="testblue">App hot sdfsdfsdfrelaodking</h1>,
	document.querySelector('.container'));

*/




let tree = createTree();
//console.log(tree);

let store = configureStore(tree);



render(<div> hello
	<Provider store={store}>
		<Node nodeId="Zero" />
	</Provider>
    </div>,
	document.querySelector('#app')
);


