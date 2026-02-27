import { AnimatePresence, motion } from "framer-motion";
import { useLocation, Routes, Route } from "react-router-dom";

import ProductsPage from "../pages/ProductsPage";
import GroupsPage from "../pages/GroupsPage";
import ArrivalPage from "../pages/ArrivalPage";

const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

const pageTransition = { duration: 0.18, ease: "easeOut" };

const Page = ({ children }) => (
  <motion.div
    variants={pageVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={pageTransition}
    style={{ height: "100%" }}
  >
    {children}
  </motion.div>
);

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/products" element={<Page><ProductsPage /></Page>} />
        <Route path="/groups" element={<Page><GroupsPage /></Page>} />
        <Route path="/orders" element={<Page><ArrivalPage /></Page>} />
        <Route path="*" element={<Page><ProductsPage /></Page>} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;