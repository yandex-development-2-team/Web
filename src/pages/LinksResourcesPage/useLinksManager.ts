import { useForm, useFieldArray } from 'react-hook-form';
import { useState } from 'react';
import type { FormData, LinkSection } from './types';

export const useLinksManager = () => {
  const { register, control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      organizationInfo: '',
      usefulLinks: [],
      faqLinks: [],
      partnerRelationsLinks: [],
    },
  });

  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    onConfirm: () => void;
  }>({ isOpen: false, onConfirm: () => {} });

  const [newLinks, setNewLinks] = useState({
    usefulLinks: { title: '', url: '' },
    faqLinks: { title: '', url: '' },
    partnerRelationsLinks: { title: '', url: '' },
  });

  const {
    fields: usefulLinksFields,
    append: appendUsefulLink,
    remove: removeUsefulLink,
  } = useFieldArray({ control, name: 'usefulLinks' });

  const {
    fields: faqLinksFields,
    append: appendFaqLink,
    remove: removeFaqLink,
  } = useFieldArray({ control, name: 'faqLinks' });

  const {
    fields: partnerRelationsFields,
    append: appendPartnerRelation,
    remove: removePartnerRelation,
  } = useFieldArray({ control, name: 'partnerRelationsLinks' });

  const handleDeleteClick = (callback: () => void) => {
    setDeleteModal({
      isOpen: true,
      onConfirm: () => {
        callback();
        setDeleteModal({ isOpen: false, onConfirm: () => {} });
      },
    });
  };

  const handleAddLink = (section: LinkSection) => {
    const linkData = newLinks[section];
    
    if (linkData.title.trim() && linkData.url.trim()) {
      const appendFunctions = {
        usefulLinks: appendUsefulLink,
        faqLinks: appendFaqLink,
        partnerRelationsLinks: appendPartnerRelation,
      };

      appendFunctions[section]({
        id: Date.now().toString(),
        title: linkData.title,
        url: linkData.url,
      });

      setNewLinks(prev => ({
        ...prev,
        [section]: { title: '', url: '' }
      }));
    }
  };

  const handleRemoveLink = (section: LinkSection, index: number) => {
    const removeFunctions = {
      usefulLinks: removeUsefulLink,
      faqLinks: removeFaqLink,
      partnerRelationsLinks: removePartnerRelation,
    };
    handleDeleteClick(() => removeFunctions[section](index));
  };

  const onSubmit = (data: FormData) => {
    console.log('Form data:', data);
  };

  const handleDeleteOrganizationInfo = () => {};

  const closeDeleteModal = () => {
    setDeleteModal({ isOpen: false, onConfirm: () => {} });
  };

  return {
    register,
    control,
    handleSubmit,
    deleteModal,
    newLinks,
    setNewLinks,
    usefulLinksFields,
    faqLinksFields,
    partnerRelationsFields,
    handleAddLink,
    handleRemoveLink,
    onSubmit,
    handleDeleteOrganizationInfo,
    closeDeleteModal,
  };
};