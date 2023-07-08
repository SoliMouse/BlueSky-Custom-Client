export const appRoutesConfig = {
  screens: {
    BottomNavigator: {
      screens: {
        PostNavigator: {
          screens: {
            PostList: "/p/",
            PostDetail: "/p/:postUri",
          },
        },
        ProfileNavigator: {
          screens: {
            ProfileHome: "/",
            ProfileDetail: "/:handle",
          },
        },
        NotificationList: "notifications",
      },
    },
  },
};
