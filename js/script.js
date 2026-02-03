  const sunrise = new Date().setHours(6, 0, 0);
  const sunset  = new Date().setHours(18, 0, 0);
  const now     = Date.now();
  let progress = (now - sunrise) / (sunset - sunrise);
  progress = Math.min(Math.max(progress, 0), 1);

  const arc = document.getElementById("arcFill");
  const sun = document.getElementById("sun");

  const length = arc.getTotalLength();

  // Solid arc up to sun
  arc.style.strokeDasharray = `${length * progress} ${length}`;
// arc.style.transition = "stroke-dasharray 0.6s ease";
// sun.style.transition = "cx 0.6s, cy 0.6s";

  // Sun position
  const point = arc.getPointAtLength(length * progress);
  sun.setAttribute("cx", point.x);
  sun.setAttribute("cy", point.y);