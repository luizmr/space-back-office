import { shallow } from 'enzyme';
import Login from 'pages/login';
import reducer, { initialState } from 'store/Reducer';
import { StateProvider } from 'store/TokenProvider';

describe('renders the component Login', () => {
  it('renders the component Login exists', () => {
    const component = shallow(
      <StateProvider initialState={initialState} reducer={reducer}>
        <Login />
      </StateProvider>
    );
    expect(component.exists()).toBeTruthy();
  });

  // it('renders the component not crashing', () => {
  //   const component = render(
  //     <StateProvider initialState={initialState} reducer={reducer}>
  //       <Login />
  //     </StateProvider>
  //   );
  //   expect(component).toBeTruthy();
  // });
});
