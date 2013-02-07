#include <linux/module.h>
#include <linux/version.h>
#include <linux/kernel.h>
#include <linux/types.h>
#include <linux/types.h>
#include <linux/kdev_t.h>
#include <linux/fs.h>

static dev_t first; //global varible for the first device number 

static int __init my_init(void) 
{
	int ret ;
	struct device *dev;
	
	if((ret = alloc_chrdev_region(&dev, FIRST_MINOR,MINOR_CNT,"The Driver")) < 0)
	{
		return ret;
	}

	cdev_init(&c_dev, &driver_fops);
	
	if ((ret = cdev_add(&c_dev, dev , MINOR_CNT )) < 0) 
	{
		unregister_chrdev_region(dev,M_CNT);
		return ret ;
	}

	if(IS_ERR(cl=class_create(THIS_MODULE,"char")))
	{
		cdev_del(&c_dev);
		unregister_chrdev_region(dev , MINOR_CNT);
		return PTR_ERR(cl);
	}
	if(IS_ERR(dev_t = device_create(cl , NULL , dev , NULL , "mychar%d", 0 )))
	{
		class_destroy(cl);
		cdev_del(&c_dev);
		unregister_chrdev_region( dev  , MINOR_CNT ) ;
		return PTR_ERR( dev_ret );
	}
	
	return 0;
}

static void __exit my_exit(void)
{
	unregister_chrdev_region(first,3);
	printk(KERN_INFO "driver is being removed");
}
module_init(my_init);
module_exit(my_exit);

MODULE_LICENSE("GPL");
MODULE_AUTHOR("KARTHIC RAO");
MODULE_DESCRIPTION("SIMPLE SRIVER FOR NODE COMMUNICATION PROJECT");
