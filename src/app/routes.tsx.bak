import { createBrowserRouter } from "react-router";
import { MainLayout } from "./layout";
import { Home } from "./pages/Home";
import { Dictionary } from "./pages/Dictionary";
import { Flashcards } from "./pages/Flashcards";
import { IELTS } from "./pages/IELTS";
import { IELTSTestList } from "./pages/IELTSTestList";
import { IELTSTest } from "./pages/IELTSTest";
import { Podcasts } from "./pages/Podcasts";
import { Community } from "./pages/Community";
import { AITutor } from "./pages/AITutor";
import { Upgrade } from "./pages/Upgrade";
import { Profile } from "./pages/Profile";
import { Legal } from "./pages/Legal";
import { Login } from "./pages/Login";
import { AdminDashboard } from "./pages/Admin";
import { Settings } from "./pages/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: Home },
      { path: "dictionary", Component: Dictionary },
      { path: "flashcards", Component: Flashcards },
      { path: "ielts", Component: IELTS },
      { path: "ielts/list/:type", Component: IELTSTestList },
      { path: "podcasts", Component: Podcasts },
      { path: "community", Component: Community },
      { path: "ai-tutor", Component: AITutor },
      { path: "upgrade", Component: Upgrade },
      { path: "profile", Component: Profile },
      { path: "settings", Component: Settings },
      { path: "legal/:type", Component: Legal },
      { path: "*", Component: () => <div className="p-8 text-center text-xl text-white">404 Not Found</div> },
    ],
  },
  {
    path: "/ielts/do-test/:type/:testId",
    Component: IELTSTest
  },
  {
    path: "/login",
    Component: Login
  },
  {
    path: "/admin",
    Component: AdminDashboard
  }
]);
