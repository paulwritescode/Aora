import NavBar from "@/components/navbar/NavBar";
import ProjectRoutes from "@/routes/ProjectRoutes";

function Layout() {
  return (
    <>
      <div className="p-4 md:p-8 sm:p-1 lg:p-10 ">
        <NavBar />

        <ProjectRoutes />
      </div>
    </>
  );
}

export default Layout;
