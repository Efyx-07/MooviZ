// Mock l'icon de la librairie iconify/react

export const Icon = (props: any) => {
  return <div data-testid={props.icon}>{props.children}</div>;
};
