export default {
  idCard: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
  isIdCard: input => /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(input),
  isPassword: input => /^(?![^a-zA-Z]+$)(?!\D+$).{6}/.test(input),
  isEmail: input => /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(input),
  isPhone: input => /^((13[0-9])|(14[5,7,9])|(15[^4])|(18[0-9])|(17[0,1,3,5,6,7,8]))\d{8}$/.test(
    input
  ),
  isWalletAddress: input => /^.{42}$/.test(input),

  formatEmail: input => input ? `${input.substr(0, 1)}***${input.replace(/.+\.(.+)$/g, '$1')}` : '',
  formatPhone: input => input ? `${input.substr(0, 3)}***${input.substr(input.length - 4)}` : '',
}
