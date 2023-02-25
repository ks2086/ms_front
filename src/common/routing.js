import { createBrowserRouter } from 'react-router-dom';

//  Components
import LoginComponent from '../components/Auth/LoginFormComponent';
import ErrorPageComponent from '../components/errorPageComponent';
import MainComponent from '../components/MainComponent';

import WelcomePageComponent, { loader as WelcomePageLoader } from '../components/WelcomePageComponent';
import NewsListComponent from '../components/Modules/News/NewsListComponent';
import NewsAddFormComponent from '../components/Modules/News/NewsAddFormComponent';
import NewsEditFormComponent from '../components/Modules/News/NewsEditFormComponent';

export const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <MainComponent />,
            errorElement: <ErrorPageComponent />,
            children: [
                {
                    index: true,
                    element: <WelcomePageComponent />,
                    loader: WelcomePageLoader
                },
                {
                    path: "/news",
                    children: [
                        {
                            index: true,
                            element: <NewsListComponent />
                        },
                        {
                            path: "add",
                            element: <NewsAddFormComponent />,
                        },
                        {
                            path: ":id",
                            element: <NewsEditFormComponent />,
                        },
                    ]
                },
                
            
            ]
          },
          {
            path: "/login",
            element: <LoginComponent />
          },
          {
            path: "/logout",
            element: <LoginComponent />
          }
    ]
)