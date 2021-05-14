import organizationReducer, {
  OrganizationState,
  add,
  update,
  select
} from './organizationSlice';

describe('organization reducer', () => {
  const initialState: OrganizationState = {
    selected: {id: '1', name:'1'},
    all: [{id: '1', name:'1'}, {id: '2', name:'2'}],
  };
  
  it('should handle initial state', () => {
    expect(organizationReducer(undefined, { type: 'unknown' })).toEqual({
      all: []
    });
  });

  it('should add', () => {
    expect(organizationReducer(initialState, add({id:'3', name:'3'}))).toMatchSnapshot()
  });

  it('should update', () => {
    expect(organizationReducer(initialState, update({id:'1', name:'1-updated'}))).toMatchSnapshot()
  });

  it('should select', () => {
    expect(organizationReducer(initialState, select('2'))).toMatchSnapshot()
  });
});
