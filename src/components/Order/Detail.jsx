import { TiLocationOutline } from "react-icons/ti";
import OrderMenu from "./OrderMenu";
import { useTranslation } from "react-i18next";

const Detail = () => {
  const { t } = useTranslation();

  return (
    <div className="basis-12/12 bg-white p-6 lg:basis-8/12">
      <div className="mb-4 text-xl font-semibold">{t("Order.title")}</div>
      <div className="rounded border-2 border-neutral-400">
        <div className="px-6 py-8">
          <div className="border-b border-neutral-400 pb-6">
            <div className="mb-1 text-lg font-medium">Order #1</div>
            <div className="text-md text-neutral-500">
              June 1, 2020, 08:22 AM
            </div>
          </div>
          <div className="border-b border-neutral-400 pb-6">
            <div className="my-3 flex">
              <div className="mr-12 basis-7/12">
                <div className="text-md text-neutral-500">
                  {t("Order.delivery")}
                </div>
                <div className="flex items-center">
                  <TiLocationOutline className="mr-1 text-2xl text-blue-600" />
                  <div className="text-lg font-semibold">Elm Street, 23</div>
                </div>
              </div>
              <div className="basis-3/12">
                <div className="text-md mb-1 text-neutral-500">
                  {t("Order.time")}
                </div>
                <div className="text-md font-semibold">10 Min</div>
              </div>
              <div className="basis-3/12">
                <div className="text-md mb-1 text-neutral-500">
                  {t("Order.payment")}
                </div>
                <div className="text-md font-semibold">Paypal</div>
              </div>
            </div>
            <div className="flex">
              <div className="text-md mr-12 basis-6/12 text-neutral-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab,
                maiores pariatur nisi odit laboriosam officiis quo quasi sed
                autem.
              </div>
            </div>
          </div>
          <div>
            <OrderMenu />
          </div>
        </div>
        <div></div>
      </div>
      <div className="mt-6 flex justify-end">
        <button className="mr-5 rounded-lg border-2 border-blue-600 p-3 px-6 font-semibold text-blue-600">
          {t("Order.action.action2")}
        </button>
        <button className="rounded-lg bg-blue-600 p-3 px-6 font-semibold text-white">
          {t("Order.action.action1")}
        </button>
      </div>
    </div>
  );
};

export default Detail;
