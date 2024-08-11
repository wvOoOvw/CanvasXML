const init = (optionOverlay) => {
  const option = Object.assign(
    {
      imageIndex: 'imageJpgRoleA',

      attackCount: 10,

      skillSpend0: 1,
      skillSpend1: 8,
      skillSpend2: 45,

      skillImageIndex0: 'imagePngCaesar',
      skillImageIndex1: 'imagePngFangs',
      skillImageIndex2: 'imagePngPlagueDoctorProfile',

      skillCount: 0,
      skillSpeed: 0.1,
    }, optionOverlay
  )

  return { key: Math.random(), component: App, option: option }
}

export default init