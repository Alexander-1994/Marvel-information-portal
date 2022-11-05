import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner";

const MainPage = lazy(() => import("../pages/MainPage")),
      ComicsPage = lazy(() => import("../pages/ComicsPage")),
      SinglePage = lazy(() => import("../pages/SinglePage")),
      SingleComic = lazy(() => import("../singleComicAndCharacter/SingleComic")),
      SingleCharacter = lazy(() => import("../singleComicAndCharacter/SingleCharacter")),
      Page404 = lazy(() => import("../pages/Page404"));

const App = () => {
    return (
        <Router>
            <div className="app">
                <AppHeader />
                <main>
                    <Suspense fullback={<Spinner/>}>
                        <Routes>
                            <Route path="/" element={<MainPage/>} />
                            <Route path="/comics" element={<ComicsPage/>} />
                            <Route path="/comics/:id" element={<SinglePage Component={SingleComic} dataType="comic" />} />
                            <Route path="/characters/:id" element={<SinglePage Component={SingleCharacter} dataType="character" />} />
                            <Route path="*" element={<Page404/>} />
                        </Routes>      
                    </Suspense>           
                </main>
            </div>
        </Router>
    )
}

export default App;