const _ = require('../util/lodash-wrap')
const stringifyArguments = require('../stringify/arguments')

module.exports = config =>
  (...matcherArgs) =>
    _.tap({
      __name: nameFor(config, matcherArgs),
      __matches (actualArg) {
        return config.matches(matcherArgs, actualArg)
      }
    }, (matcherInstance) =>
      _.invoke(config, 'onCreate', matcherInstance, matcherArgs)
    )

var nameFor = (config, matcherArgs) => {
  if (_.isFunction(config.name)) {
    return config.name(matcherArgs)
  } else if (config.name != null) {
    return `${config.name}(${stringifyArguments(matcherArgs)})`
  } else {
    return `[Matcher for (${stringifyArguments(matcherArgs)})]`
  }
}
