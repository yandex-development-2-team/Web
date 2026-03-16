import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Switch } from '@/components/ui/Switch';
import { navigate } from '@/services/navigation.service';
import { ROUTES } from '@/app/router/routes';
import { Section } from '@/pages/EmployeeAddPage/components/Section';
import { FormCard } from '@/pages/EmployeeAddPage/components/FormCard';
import { ContactInfoSection, PositionInfoSection } from './components';
import { employeeMock } from './mocks/employee.mock';
import MessageIcon from '@/assets/icons/message.svg?react';
import PhoneIcon from '@/assets/icons/phone.svg?react';
import CameraIcon from '@/assets/icons/camera.svg?react';
import employeeAvatar from '@/assets/images/AddEmployee.jpg';

const actionButtons = [
  {
    label: 'Написать сообщение',
    icon: MessageIcon,
    variant: 'default-primary',
  },
  {
    label: 'Позвонить',
    icon: PhoneIcon,
    variant: 'default-secondary',
  },
  {
    label: 'Видеозвонок',
    icon: CameraIcon,
    variant: 'default-secondary',
  },
] as const;

function EmployeeCardPage() {
  const [isEmployeeActive, setIsEmployeeActive] = useState(true);
  const employee = employeeMock;

  return (
    <div className="w-full space-y-5">
      <section className="bg-card rounded-lg p-5 pb-4">
        <h1 className="text-3xl tracking-[0.04em]">Карточка сотрудника</h1>
      </section>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[384px_1fr]">
        <aside className="space-y-5">
          <FormCard className="bg-card rounded-lg p-11">
            <div className="border-background m-auto w-36 border-b-2 pb-2">
              <div className="group border-accent-strong relative aspect-square w-36 rounded-full border-1 p-1.5">
                <div className="relative h-full w-full overflow-hidden rounded-full">
                  <div className="absolute inset-0 flex items-center justify-center pt-4 pr-1">
                    <img src={employeeAvatar} alt="Фото сотрудника" />
                  </div>
                </div>
              </div>
            </div>
          </FormCard>

          <section className="space-y-3">
            {actionButtons.map(({ label, icon: Icon, variant }) => (
              <Button
                key={label}
                type="button"
                variant={variant}
                className="shadow-elevation-light-1 hover:border-accent active:border-accent-strong h-12 w-full gap-2 border border-transparent"
              >
                <div className="flex items-center gap-2 pr-2">
                  <Icon className="size-8" />
                  {label}
                </div>
              </Button>
            ))}
          </section>

          <section className="bg-card rounded-lg p-5 pt-4">
            <h3 className="text-xl font-semibold">Статус сотрудника</h3>
            <div className="flex items-start justify-between pt-2">
              <div className="mr-6 space-y-3">
                <p className="text-md font-semibold">
                  {isEmployeeActive ? 'Активен' : 'Неактивен'}
                </p>
                <p className="text-muted-foreground text-xs leading-tight">
                  {isEmployeeActive
                    ? 'При отключении сотрудник потеряет доступ к системе'
                    : 'Доступ временно отключен'}
                </p>
              </div>
              <Switch
                checked={isEmployeeActive}
                onCheckedChange={setIsEmployeeActive}
                className="data-[state=checked]:bg-primary"
              />
            </div>
          </section>
        </aside>

        <Section className="space-y-5 pr-5 pl-5" title="" withIcon={false}>
          <header className="flex items-center justify-between pb-4">
            <h2 className="text-2xl leading-none font-bold">
              {employee.fullName}
            </h2>
            <p className="text-md">{employee.role}</p>
          </header>

          <div className="space-y-7">
            <ContactInfoSection
              phone={employee.contact.phone}
              email={employee.contact.email}
              city={employee.contact.city}
            />

            <PositionInfoSection
              department={employee.position.department}
              position={employee.position.position}
              manager={employee.position.manager}
            />
          </div>
        </Section>
      </div>

      <div className="flex justify-end">
        <Button
          type="button"
          className="text-foreground h-12"
          onClick={() => navigate(ROUTES.EMPLOYEE_EDIT)}
        >
          Редактировать
        </Button>
      </div>
    </div>
  );
}

export const Component = EmployeeCardPage;
