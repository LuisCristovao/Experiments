using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Proto_Player : MonoBehaviour {



    private Rigidbody2D rb;
    double time;


    public float speed = 2;
    public float change_dir_force = 2;
    public float jump_strenght = 10;
    public bool on_air = false;
    public float max_jump_time = 0.1f;
    public float small_jump_factor = 2;

    // Use this for initialization
    void Start () {
        time = 0;
        rb = GetComponent<Rigidbody2D>();
        on_air = false;
    }
	
	// Update is called once per frame
	void Update () {

        

        if (Input.GetKey("d") )
        {
            //rb.velocity = new Vector2(speed, 0);
            if (rb.velocity.x < 0)
            {
                rb.AddForce(new Vector2(change_dir_force*speed, 0));
            }
            else {
                rb.AddForce(new Vector2(speed, 0));
            }
            
        }

        if (Input.GetKey("a"))
        {
            if (rb.velocity.x > 0)
            {
                rb.AddForce(new Vector2(change_dir_force * -speed, 0));
            }
            else
            {
                rb.AddForce(new Vector2(-speed, 0));
            }
        }

        if (Input.GetKey("w"))
        {
            time += Time.deltaTime;
            

            //max jump
            if (time > max_jump_time)
            {
                //rb.velocity = new Vector2(0, jump_strenght);
                if (!on_air)
                {
                    print("Max jump");//take out!!!
                    rb.AddForce(new Vector2(0, jump_strenght));
                    on_air = true;
                }
            }

            
        }
        if (Input.GetKeyUp("w"))
        {
            if (!on_air)
            {
                print("Small");//take out!!!
                rb.AddForce(new Vector2(0, (jump_strenght*((float)time*small_jump_factor))));
                on_air = true;
            }
            time = 0;
        }
        
    }
        

    

    private void OnCollisionEnter2D(Collision2D collision)
    {
        on_air = false;
    }







}
