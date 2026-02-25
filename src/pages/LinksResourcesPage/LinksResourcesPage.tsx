import { useForm, useFieldArray } from "react-hook-form";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
// import { DeleteConfirmModal } from "./DeleteConfirmModal";
import { cn } from "@/utils";

interface LinkItem {
  id: string;
  title?: string;
  url: string;
}

interface FormData {
  organizationInfo: string;
  usefulLinks: LinkItem[];
  faqLinks: LinkItem[];
  partnerRelationsLinks: LinkItem[];
}

const LinksResourcesPage = () => {
  const { register, control, handleSubmit, watch } = useForm<FormData>({
    defaultValues: {
      organizationInfo: "",
      usefulLinks: [],
      faqLinks: [],
      partnerRelationsLinks: [],
    },
  });

  const {
    fields: usefulLinksFields,
    append: appendUsefulLink,
    remove: removeUsefulLink,
  } = useFieldArray({
    control,
    name: "usefulLinks",
  });

  const {
    fields: faqLinksFields,
    append: appendFaqLink,
    remove: removeFaqLink,
  } = useFieldArray({
    control,
    name: "faqLinks",
  });

  const {
    fields: partnerRelationsFields,
    append: appendPartnerRelation,
    remove: removePartnerRelation,
  } = useFieldArray({
    control,
    name: "partnerRelationsLinks",
  });

  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    onConfirm: () => void;
  }>({
    isOpen: false,
    onConfirm: () => {},
  });

  const [newUsefulLink, setNewUsefulLink] = useState({ title: "", url: "" });
  const [newFaqLink, setNewFaqLink] = useState("");
  const [newPartnerRelationLink, setNewPartnerRelationLink] = useState("");

  const handleDeleteClick = (callback: () => void) => {
    setDeleteModal({
      isOpen: true,
      onConfirm: () => {
        callback();
        setDeleteModal({ isOpen: false, onConfirm: () => {} });
      },
    });
  };

  const handleAddUsefulLink = () => {
    if (newUsefulLink.title.trim() && newUsefulLink.url.trim()) {
      appendUsefulLink({
        id: Date.now().toString(),
        title: newUsefulLink.title,
        url: newUsefulLink.url,
      });
      setNewUsefulLink({ title: "", url: "" });
    }
  };

  const handleAddFaqLink = () => {
    if (newFaqLink.trim()) {
      appendFaqLink({
        id: Date.now().toString(),
        title: "",
        url: newFaqLink,
      });
      setNewFaqLink("");
    }
  };

  const handleAddPartnerRelationLink = () => {
    if (newPartnerRelationLink.trim()) {
      appendPartnerRelation({
        id: Date.now().toString(),
        title: "",
        url: newPartnerRelationLink,
      });
      setNewPartnerRelationLink("");
    }
  };

  const onSubmit = (data: FormData) => {
    console.log("Form data:", data);
    // TODO: Отправка на бэк
  };

  const handleDeleteOrganizationInfo = () => {
    // Логика удаления информации об организации
  };

  return (
    <div className={cn("flex h-full flex-col gap-5")}>
      <form onSubmit={handleSubmit(onSubmit)} className={cn("flex flex-col gap-5")}>
        {/* Информация об организации */}
        <section className={cn("bg-card rounded-lg p-5")}>
          <h2 className={cn("mb-5")}>Информация об организации</h2>
          <div className={cn("mb-4")}>
            <label className={cn("block text-[#8B8C8B] text-xs mb-1")}>Текст</label>
            <Textarea
              {...register("organizationInfo")}
              placeholder="Введите текст..."
              className={cn("w-full h-[60px]")}
            />
          </div>
          <div className={cn("flex gap-5 justify-end")}>
            <Button
  type="button"
  variant="default-secondary"
  onClick={() => handleDeleteClick(handleDeleteOrganizationInfo)}
  className={cn("w-[196px] border-[#F4DB54]")}
>
  Удалить
</Button>
            <Button type="submit" className={cn("w-[196px]")}>
              Сохранить
            </Button>
          </div>
        </section>

        {/* Полезные ссылки */}
        <section className={cn("bg-card rounded-lg p-5")}>
          <h2 className={cn("mb-5")}>Полезные ссылки</h2>
          
          {/* Форма добавления новой ссылки */}
          <div className={cn("mb-6")}>
            <div className={cn("flex gap-5 items-end")}>
              <div className={cn("flex-1 space-y-5")}>
                <div>
                  <label className={cn("block text-[#8B8C8B] text-xs mb-1")}>Название</label>
                  <Input
                    value={newUsefulLink.title}
                    onChange={(e) => setNewUsefulLink({ ...newUsefulLink, title: e.target.value })}
                    placeholder="Название"
                    className={cn("w-full")}
                  />
                </div>
                <div>
                  <label className={cn("block text-[#8B8C8B] text-xs mb-1")}>URL</label>
                  <Input
                    value={newUsefulLink.url}
                    onChange={(e) => setNewUsefulLink({ ...newUsefulLink, url: e.target.value })}
                    placeholder="Ссылка"
                    className={cn("w-full")}
                  />
                </div>
              </div>
              <Button
                type="button"
                onClick={handleAddUsefulLink}
                className={cn("w-[196px] h-10")}
              >
                Загрузить
              </Button>
            </div>
          </div>

          {/* Список загруженных ссылок */}
          {usefulLinksFields.length > 0 && (
            <div className={cn("space-y-2")}>
              {usefulLinksFields.map((field, index) => (
                <div key={field.id} className={cn("flex items-center gap-2")}>
                  <a
                    href={field.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn("inline-block px-3 py-1.5 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors text-sm")}
                  >
                    {field.title}
                  </a>
                  <button
                    type="button"
                    onClick={() => handleDeleteClick(() => removeUsefulLink(index))}
                    className={cn("text-gray-400 hover:text-gray-600")}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 5L15 15M5 15L15 5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* FAQ */}
        <section className={cn("bg-card rounded-lg p-5")}>
          <h2 className={cn("mb-5")}>FAQ</h2>
          <div className={cn("mb-4")}>
            <label className={cn("block text-[#8B8C8B] text-xs mb-1")}>Вставьте ссылку</label>
            <div className={cn("flex gap-5")}>
              <Input
                value={newFaqLink}
                onChange={(e) => setNewFaqLink(e.target.value)}
                placeholder="Ссылка"
                className={cn("w-[803px]")}
              />
              <Button
                type="button"
                onClick={handleAddFaqLink}
                className={cn("w-[196px]")}
              >
                Загрузить
              </Button>
            </div>
          </div>

          {faqLinksFields.map((field, index) => (
            <div key={field.id} className={cn("space-y-3")}>
              <div className={cn("flex gap-5 items-start")}>
                <div className={cn("w-[803px] space-y-3")}>
                  <label className={cn("block text-[#8B8C8B] text-xs mb-1")}>Название</label>
                  <Input
                    {...register(`faqLinks.${index}.title`)}
                    placeholder="Название"
                    className={cn("w-full")}
                  />
                  <a
                    href={watch(`faqLinks.${index}.url`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn("inline-block px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors text-sm")}
                  >
                    {watch(`faqLinks.${index}.title`) || watch(`faqLinks.${index}.url`)}
                  </a>
                </div>
                <button
                  type="button"
                  onClick={() => handleDeleteClick(() => removeFaqLink(index))}
                  className={cn("text-gray-400 hover:text-gray-600 p-2")}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 5L15 15M5 15L15 5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </section>

        {/* Афиша Partner Relations */}
        <section className={cn("bg-card rounded-lg p-5")}>
          <h2 className={cn("mb-5")}>Афиша Partner Relations</h2>
          <div className={cn("mb-4")}>
            <label className={cn("block text-[#8B8C8B] text-xs mb-1")}>Вставьте ссылку</label>
            <div className={cn("flex gap-5")}>
              <Input
                value={newPartnerRelationLink}
                onChange={(e) => setNewPartnerRelationLink(e.target.value)}
                placeholder="Ссылка"
                className={cn("w-[805px]")}
              />
              <Button
                type="button"
                onClick={handleAddPartnerRelationLink}
                className={cn("w-[196px]")}
              >
                Загрузить
              </Button>
            </div>
          </div>

          {partnerRelationsFields.map((field, index) => (
            <div key={field.id} className={cn("space-y-3")}>
              <div className={cn("flex gap-5 items-start")}>
                <div className={cn("w-[805px] space-y-3")}>
                  <label className={cn("block text-[#8B8C8B] text-xs mb-1")}>Название</label>
                  <Input
                    {...register(`partnerRelationsLinks.${index}.title`)}
                    placeholder="Название"
                    className={cn("w-full")}
                  />
                  <a
                    href={watch(`partnerRelationsLinks.${index}.url`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn("inline-block px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors text-sm")}
                  >
                    {watch(`partnerRelationsLinks.${index}.title`) ||
                      watch(`partnerRelationsLinks.${index}.url`)}
                  </a>
                </div>
                <button
                  type="button"
                  onClick={() => handleDeleteClick(() => removePartnerRelation(index))}
                  className={cn("text-gray-400 hover:text-gray-600 p-2")}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 5L15 15M5 15L15 5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </section>
      </form>

      {/* <DeleteConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, onConfirm: () => {} })}
        onConfirm={deleteModal.onConfirm}
      /> */}
    </div>
  );
};

export const Component = LinksResourcesPage;