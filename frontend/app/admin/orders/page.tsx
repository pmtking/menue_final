import LiveClock from "@/components/LiveClock/page";
import { ArchiveTick, TimerPause } from "iconsax-reactjs";

const OrderPage = () => {
  return (
    <>
      <main className="flex flex-col justify-center w-screen px-10 mt-3">
        <div className="border-b  flex  justify-between  py-3">
          <h1>سفارشات</h1>
          <LiveClock />
          <div className="flex justify-center items-center gap-3">
            <ArchiveTick />
            <ArchiveTick />
            <ArchiveTick />
          </div>
        </div>
            
      </main>
    </>
  );
};

export default OrderPage;
