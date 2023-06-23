window.addEventListener('DOMContentLoaded', () => {
  const $headerStatus = document.querySelector('.header-system-status-container');
  const $headerStatusMessage = document.querySelector('.header__status-message');

  const $operationalIcons = document.querySelectorAll('.operational');
  const $warningIcons = document.querySelectorAll('.warning');
  const $allSystemStatusIcons = document.querySelectorAll('.status-icon');

  // https://kb.status.io/developers/status-codes/
  const status = {
    100: {
      icons: $operationalIcons,
      message: '',
      title: 'Operational',
    },
    200: {
      icons: $warningIcons,
      message: 'Planned Maintenance - We are currently undergoing some scheduled maintenance.',
      title: 'Planned Maintenance',
    },
    300: {
      icons: $warningIcons,
      message: 'Degraded Performance - We are currently experiencing degraded performance in some of our web services.',
      title: 'Degraded Performance',
    },
    400: {
      icons: $warningIcons,
      message: 'Partial Service Disruption - Some of our web services are temporarily unavailable.',
      title: 'Partial Service Disruption',
    },
    500: {
      icons: $warningIcons,
      message: 'Service Disruption - Our web services are temporarily unavailable.',
      title: 'Service Disruption',
    },
    600: {
      icons: $warningIcons,
      message: 'Security Event - We are currently mitigating issues relating to some of our web services.',
      title: 'Security Event',
    },
  };

  const setSystemStatus = (status) => {
    $allSystemStatusIcons.forEach($systemStatusIcon => {
      if ($systemStatusIcon) {
        $systemStatusIcon.classList.remove('show-status-icon');
      }
    });

    if (status.icons.length > 1) {
      $headerStatus.classList.add('show-header-system-status');
      $headerStatusMessage.innerText = `${status.title}: ${status.message}`;
    } else {
      $headerStatus.classList.remove('show-header-system-status');
    }

    status.icons.forEach((icon) => {
      icon.classList.add('show-status-icon');
    });
  };

  const getSystemStatus = () =>
    // eslint-disable-next-line compat/compat
    fetch('https://status.maxmind.com/1.0/status/53fcfbb2ac0c957972000235')
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('status document could not be fetched');
      })
      .then((json) => {
        const statusCode = json.result.status_overall.status_code;
        if (json.result.incidents.length !== 0) {
          setSystemStatus({
            icons: $warningIcons,
            message: json.result.incidents[0].name,
            title: status[Number(statusCode)].title,
          });
          return;
        } else if (json.result.maintenance.active.length !== 0) {
          setSystemStatus({
            icons: $warningIcons,
            message: json.result.maintenance.active[0].name,
            title: status[Number(statusCode)].title,
          });
          return;
        }
        setSystemStatus(status[Number(statusCode)]);
      })
      .catch((e) => {
        console.error(e);
      });
  getSystemStatus();

  setInterval(() => {
    getSystemStatus();
  }, 30 * 1000);
});
