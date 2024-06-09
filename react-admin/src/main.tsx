import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
//方法一使用路由
// import { BrowserRouter, RouterProvider } from 'react-router-dom'
// import BaseRouter from './router1'
//方法二使用路由
import { RouterProvider } from 'react-router-dom'
import BaseRouter2 from './router2'
ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		{/* <BrowserRouter>
			<BaseRouter />
		</BrowserRouter> */}
		<RouterProvider router={BaseRouter2} />
	</React.StrictMode>
)
