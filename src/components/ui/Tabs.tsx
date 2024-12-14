import { ReactNode } from 'react';

interface TabsProps {
  selectedTab: string;
  onChange: (tabId: string) => void;
  children: ReactNode;
}

interface TabListProps {
  className?: string;
  children: ReactNode;
}

interface TabProps {
  id: string;
  className?: string;
  activeClassName?: string;
  inactiveClassName?: string;
  children: ReactNode;
}

interface TabPanelProps {
  id: string;
  children: ReactNode;
}

export function Tabs({ selectedTab, onChange, children }: TabsProps) {
  const enhancedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { selectedTab, onChange });
    }
    return child;
  });

  return <div>{enhancedChildren}</div>;
}

export function TabList({ className, children }: TabListProps) {
  return <div className={className}>{children}</div>;
}

export function Tab({
  id,
  className,
  activeClassName,
  inactiveClassName,
  children,
  selectedTab,
  onChange,
}: TabProps & { selectedTab?: string; onChange?: (id: string) => void }) {
  const isActive = selectedTab === id;
  const finalClassName = `${className} ${
    isActive ? activeClassName : inactiveClassName
  }`;

  return (
    <button
      type="button"
      onClick={() => onChange?.(id)}
      className={finalClassName}
    >
      {children}
    </button>
  );
}

export function TabPanel({
  id,
  children,
  selectedTab,
}: TabPanelProps & { selectedTab?: string }) {
  if (selectedTab !== id) return null;
  return <div>{children}</div>;
}