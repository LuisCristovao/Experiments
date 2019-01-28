using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ManualRocket : MonoBehaviour {

    public float rocket_force = 10;
    public GameObject player;
    public float rocket_increment = 0.1f;


    Rigidbody rb;
    // Use this for initialization
    void Start()
    {
        rb = GetComponent<Rigidbody>();
    }
    bool FlyingMode()
    {
        return player.GetComponent<Player>().flying_mode;
    }
    bool OnAir()
    {
        return !(player.transform.position.y < 3);
        //return player.GetComponent<Player>().on_air;
    }



    void RocketControl()
    {

        if (!OnAir())
        {
            rocket_force += rocket_increment;
        }
        else
        {
            if (rocket_force > 0)
            {
                rocket_force -= rocket_increment;
            }

        }


    }
    // Update is called once per frame
    void Update () {
        if (FlyingMode())
        {
            if (Input.GetKey("w"))
            {
                rb.AddForce(new Vector3(0, rocket_force, 0));
            }
            
            
        }
    }
}
