// configure the bottom tab bar.
export default defineAppConfig({
  pages: [
    'pages/login/index',
    'pages/create/index',
    'pages/myAppointments/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'Fustack_demo',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: "#333",
    selectedColor: "#000",
    backgroundColor: "#fff",
    list: [
      {
        pagePath: "pages/create/index", // home page
        text: "Creating Appointment"
      },
      {
        pagePath: "pages/myAppointments/index",
        text: "My Appointments"
      }
    ]
  }
})
