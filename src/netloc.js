#!/usr/bin/osascript -l JavaScript
//
// Copyright (c) 2014 deanishe@deanishe.net
// Copyright (c) 2026 Connor Brown
//
// MIT Licence. See http://opensource.org/licenses/MIT
//
// List network locations as Alfred Script Filter JSON.
// Alfred filters the results itself ("Alfred filters results" is on).

ObjC.import('Foundation');

const ICON_NETWORK =
  '/System/Library/CoreServices/CoreTypes.bundle/Contents/Resources/GenericNetworkIcon.icns';

// Run /usr/sbin/scselect and return its stdout.
function scselect() {
  const task = $.NSTask.alloc.init;
  const pipe = $.NSPipe.pipe;
  task.executableURL = $.NSURL.fileURLWithPath('/usr/sbin/scselect');
  task.standardOutput = pipe;
  task.launchAndReturnError(null);
  const data = pipe.fileHandleForReading.readDataToEndOfFile;
  task.waitUntilExit;
  return $.NSString.alloc.initWithDataEncoding(data, $.NSUTF8StringEncoding).js;
}

// Lines look like: " * E2522B9A-47B6-4DE3-9DFD-AFAF76ABF1F9\t(Work)"
function locations() {
  return scselect()
    .split('\n')
    .map((line) => line.match(/^([ *]+)([0-9A-F-]+)\s+\((.+)\)$/))
    .filter(Boolean)
    .map(([, state, id, name]) => ({ id, name, current: state.includes('*') }));
}

function run() {
  // Active location last, so the top result is one you can switch to.
  // No `uid`, so Alfred keeps this order instead of learning its own.
  const locs = locations().sort((a, b) => a.current - b.current);

  const items = locs.map((loc) => ({
    title: loc.current ? `${loc.name} (active)` : loc.name,
    subtitle: loc.current ? 'This location is currently active' : 'Switch to this location',
    match: loc.name,
    arg: loc.id,
    valid: !loc.current,
    variables: { location: loc.name },
    icon: { path: ICON_NETWORK },
    // The active location isn't valid for ↩, but ⌘↩ must still work on it.
    mods: { cmd: { valid: true, arg: loc.id, subtitle: 'Open Network Settings' } },
  }));
  return JSON.stringify({ items });
}
