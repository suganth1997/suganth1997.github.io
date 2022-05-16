function setup() {
  createCanvas(1280, 720);
}

let dt = 0.01;

let X = [Math.PI/6, 0];

let T = 0.0;

let g = 9.8;

let L = 1;

let kappa = 0.25;

function dx_dt(t, x){
  y = [x[1], (-g/L)*Math.sin(x[0]) - kappa * x[1]];
  return y;
}

function RK4Step(x){
  
  n = x.length;
  
  k1 = dx_dt(T, x);

  x2 = x.slice();
  x3 = x.slice();
  x4 = x.slice();

  for(let i = 0; i < n; i++)
  {
    x2[i] += dt * k1[i] / 2;
  }

  k2 = dx_dt(T + (dt / 2), x2);

  for(let i = 0; i < n; i++)
  {
    x3[i] += dt * k2[i] / 2;
  }

  k3 = dx_dt(T + (dt / 2), x3);

  for(let i = 0; i < n; i++)
  {
    x4[i] += dt * k3[i];
  }

  k4 = dx_dt(T + dt, x4);

  for(let i = 0; i < n; i++)
  {
    x[i] += (1.0/6.0)*dt*(k1[i] + 2*k2[i] + 2*k3[i] + k4[i]);
  }

  return x;
}

function changeKappa(x)
{
  // console.log(x);
  kappa = Number(x);
  document.getElementById("kappaVal").innerHTML = x;
}

function changeLength(x)
{
  // console.log(x);
  L = Number(x);
  document.getElementById("lengthVal").innerHTML = x;
}

function startPendulum()
{
  X = [Math.PI/6, 0];
}

function draw() {
  background(255);

  pendulum_pos = [640 + 400 * L * Math.sin(X[0]), 400 * L * Math.cos(X[0])];

  line(640, 0, pendulum_pos[0], pendulum_pos[1]);
  ellipse(pendulum_pos[0], pendulum_pos[1], 80, 80);

  drawingContext.setLineDash([5, 5]);

  line(640, 0, 640, 720);

  drawingContext.setLineDash([1]);

  X = RK4Step(X);
  
  T += dt;
  // console.log(X);
  // X[0] += 0.1; (I - dt*J)^-1 
  // t %= 2*Math.PI;
}