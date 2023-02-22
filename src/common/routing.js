import { createBrowserRouter } from 'react-router-dom';

//  Components
import LoginComponent from '../components/LoginComponent';
import ErrorPageComponent from '../components/errorPageComponent';
import MainComponent from '../components/MainComponent';

import WelcomePageComponent, { loader as WelcomePageLoader } from '../components/WelcomePageComponent';
import NewsListComponent, { loader as NewsListComponentLoader } from '../components/Modules/News/NewsListComponent';
import NewsEditComponent, { loader as NewsEditComponentLoader, editAction } from '../components/Modules/News/NewsEditComponent';

export const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <MainComponent />,
            errorElement: <ErrorPageComponent />,
            children: [
                {
                    path: "/",
                    element: <WelcomePageComponent />,
                    loader: WelcomePageLoader
                },
                {
                    path: "/news",
                    element: <NewsListComponent />,
                    loader: NewsListComponentLoader
                },
                {
                    path: "/news/:id",
                    element: <NewsEditComponent />,
                    loader: NewsEditComponentLoader,
                    action: editAction
                },
            
            ]
          },
          {
            path: "/login",
            element: <LoginComponent />
          }
    ]
)