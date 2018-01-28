import Config from '@/config/config'

export default function (path) {
  return fetch(
    Config.serverUrl + '/api/' + path,
    {
      method: 'POST'
    }
  )
}
