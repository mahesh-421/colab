import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';

import { SocketVideoCallProvider } from './hooks/socket/SocketVideoCallProvider.jsx';
import { SocketColabProvider } from './hooks/socket/SocketColabProvider.jsx';

import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Homepage from './pages/Homepage';

const LazyVideoCallSetup = React.lazy(() =>
  import('./pages/videoCallRoom/VideoCallSetup')
);

const LazyColabSetup = React.lazy(() => import('./pages/colabRoom/ColabSetup'));

const LazyVideoCallRoom = React.lazy(() =>
  import('./pages/videoCallRoom/VideoCallRoom')
);

const LazyColabRoom = React.lazy(() => import('./pages/colabRoom/ColabRoom'));

const App = () => {
  const authUser = useSelector((store) => store.applicationStates.authUser);
  const applicationData = useSelector((store) => store.applicationStates);

  return (
    <div>
      <Routes>
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" /> : <SignUp />}
        />
        <Route
          path="/signin"
          element={authUser ? <Navigate to="/" /> : <SignIn />}
        />
        <Route
          path="/"
          element={authUser ? <Homepage /> : <Navigate to="/signin" />}
        />
        <Route path="*" element={<Navigate to="/signin" />} />
        <Route
          path="/videocallsetup"
          element={
            authUser ? (
              <React.Suspense>
                <LazyVideoCallSetup />
              </React.Suspense>
            ) : (
              <Navigate to="/signin" />
            )
          }
        >
          <Route
            path="room/:roomId"
            element={
              authUser ? (
                applicationData.showVideoPage ? (
                  <React.Suspense>
                    <SocketVideoCallProvider>
                      <LazyVideoCallRoom />
                    </SocketVideoCallProvider>
                  </React.Suspense>
                ) : (
                  <Navigate to="/videocallsetup" />
                )
              ) : (
                <Navigate to="/signin" />
              )
            }
          />
        </Route>
        <Route
          path="/colabsetup"
          element={
            authUser ? (
              <React.Suspense>
                <LazyColabSetup />
              </React.Suspense>
            ) : (
              <Navigate to="/signin" />
            )
          }
        >
          <Route
            path="room/:roomId"
            element={
              authUser ? (
                applicationData.showColabPage ? (
                  <React.Suspense>
                    <SocketColabProvider>
                      <LazyColabRoom />
                    </SocketColabProvider>
                  </React.Suspense>
                ) : (
                  <Navigate to="/colabsetup" />
                )
              ) : (
                <Navigate to="/signin" />
              )
            }
          />
        </Route>
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
