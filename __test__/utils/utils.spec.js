import AuthService from '../../utils/AuthService'


describe("Pages", () => {
  describe("AuthService", () => {
    let auth=''
    const mockSet = jest.spyOn(Storage.prototype, 'setItem');
    const mockGet = jest.spyOn(Storage.prototype, 'getItem');
    const mockRemoveItem = jest.spyOn(Storage.prototype, 'getItem');
    const mockJsonPromise = Promise.resolve({});
    let loginUser = jest.fn().mockResolvedValue({ status: 200, json: () => mockJsonPromise, })
    window.fetch = jest.fn().mockResolvedValue({ status: 200, json: () => mockJsonPromise, })

    beforeEach(()=>{
      loginUser.mockClear()
      window.fetch.mockClear()
      auth = new AuthService('http://local')

    })

    it("LoggedIn", ()=> {
      auth.loggedIn()
      expect(mockGet).toHaveBeenCalledTimes(1);
    });

    it("setUserInfo", ()=> {
      auth.setUserInfo('foo')
      expect(mockSet).toHaveBeenCalledTimes(1);
    });
    it("setUserInfo", ()=> {
      auth.logout()
      expect(mockRemoveItem).toHaveBeenCalledTimes(1);
    });
    it("login", done => {
       auth.login().then(()=>{
        expect(window.fetch.mock.calls).toMatchSnapshot()
        done()
      })
    })

  })



})
